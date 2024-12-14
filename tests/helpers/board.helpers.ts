import {Column} from "../models/board.models";

export async function loginToApp(page) {
    await page.goto(' https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
}

export async function navigateToWebApplication(page) {
    await page.locator('nav').locator('button').locator('text="Web Application"').click();
}

export async function navigateToMobileApplication(page) {
    await page.locator('nav').locator('button').locator('text="Mobile Application"').click();
}

export async function getColumns(page): Promise<Column[]> {
    const columns: Column[] = [];
    const columnElements = await page.locator('main > div > div > div');
    const columnCount = await columnElements.count();

    for (let i = 0; i < columnCount; i++) {
        const columnElement = columnElements.nth(i);
        const columnName: string = await columnElement.locator('h2').innerText();
        const columnNameFormatted = columnName.substring(0,columnName.indexOf("(")).trim();
        const column = new Column(columnElement, columnNameFormatted);
        await column.mapTasks(); // Map tasks for this column
        columns.push(column);
    }

    return columns;
}