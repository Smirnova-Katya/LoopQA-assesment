import {expect, test} from "@playwright/test";

class Task {
    constructor(public taskLocator, public name,public tags) {
        this.taskLocator = taskLocator;
        this.name = name;
        this.tags = tags;
    }
}

class Column {
    public tasks;
    constructor(public columnLocator, public name) {
        this.columnLocator = columnLocator;
        this.name = name;
        this.tasks = [];
    }

    async mapTasks() {
        const taskElements = await this.columnLocator.locator('.bg-white');
        const taskCount = await taskElements.count();

        for (let i = 0; i < taskCount; i++) {
            const taskElement = taskElements.nth(i);
            const taskName = await taskElement.locator('h3').innerText();
            const tags = [];
            const tagElements = await taskElement.locator('.px-2');
            const tagCount = await tagElements.count();
            for (let j = 0; j < tagCount; j++) {
                const tag = await tagElements.nth(j).innerText();
                tags.push(tag);
            }
            this.tasks.push(new Task(taskElement, taskName, tags));
        }
    }

    async findTaskByName(taskName) {
        return this.tasks.find(t => t.name === taskName);
    }
}

async function loginToApp(page) {
    await page.goto(' https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
}

async function navigateToWebApplication(page) {
    await page.locator('nav').locator('button').locator('text="Web Application"').click();
}

async function navigateToMobileApplication(page) {
    await page.locator('nav').locator('button').locator('text="Mobile Application"').click();
}

async function getColumns(page): Promise<Column[]> {
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

test('Test Case 1', async ({ page }) => {
    await loginToApp(page);

    await navigateToWebApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Implement user authentication");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(2);
    expect(task.tags).toContain("Feature");
    expect(task.tags).toContain("High Priority");
});

test('Test Case 2', async ({ page }) => {
    await loginToApp(page);

    await navigateToWebApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Fix navigation bug");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Bug");

});

test('Test Case 3', async ({ page }) => {
    await loginToApp(page);

    await navigateToWebApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "In Progress");
    const task: Task = await todoColumn.findTaskByName("Design system updates");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Design");

});

test('Test Case 4', async ({ page }) => {
    await loginToApp(page);

    await navigateToMobileApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Push notification system");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Feature");
});

test('Test Case 5', async ({ page }) => {
    await loginToApp(page);

    await navigateToMobileApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "In Progress");
    const task: Task = await todoColumn.findTaskByName("Offline mode");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(2);
    expect(task.tags).toContain("Feature");
    expect(task.tags).toContain("High Priority");
});

test('Test Case 6', async ({ page }) => {
    await loginToApp(page);

    await navigateToMobileApplication(page);
    const columns: Column[]  = await getColumns(page);

    const todoColumn: Column = columns.find(col => col.name === "Done");
    const task: Task = await todoColumn.findTaskByName("App icon design");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Design");

});