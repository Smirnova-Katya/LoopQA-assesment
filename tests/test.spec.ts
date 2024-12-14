import {expect, test} from "@playwright/test";
import {Column, Task} from "./models/board.models";
import {getColumns, loginToApp, navigateToMobileApplication, navigateToWebApplication} from "./helpers/board.helpers";

test.beforeEach(async ({page}) =>  {
    await loginToApp(page);
});

test('Test case 1 - Verify "Implement user authentication" is in the "To Do" column', async ({ page }) => {
    await navigateToWebApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Implement user authentication");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(2);
    expect(task.tags).toContain("Feature");
    expect(task.tags).toContain("High Priority");
});

test('Test Case 2 - Verify "Fix navigation bug" is in the "To Do" column', async ({ page }) => {
    await navigateToWebApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Fix navigation bug");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Bug");

});

test('Test Case 3 - Verify "Design system updates" is in the "In Progress" column', async ({ page }) => {
    await navigateToWebApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "In Progress");
    const task: Task = await todoColumn.findTaskByName("Design system updates");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Design");

});

test('Test Case 4 - Verify "Push notification system" is in the "To Do" column', async ({ page }) => {
    await navigateToMobileApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "To Do");
    const task: Task = await todoColumn.findTaskByName("Push notification system");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Feature");
});

test('Test Case 5 - Verify "Offline mode" is in the "In Progress" column', async ({ page }) => {
    await navigateToMobileApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "In Progress");
    const task: Task = await todoColumn.findTaskByName("Offline mode");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(2);
    expect(task.tags).toContain("Feature");
    expect(task.tags).toContain("High Priority");
});

test('Test Case 6 - Verify "App icon design" is in the "Done" column', async ({ page }) => {
    await navigateToMobileApplication(page);

    const columns: Column[]  = await getColumns(page);
    const todoColumn: Column = columns.find(col => col.name === "Done");
    const task: Task = await todoColumn.findTaskByName("App icon design");
    expect(task).toBeDefined();

    expect(task.tags).toHaveLength(1);
    expect(task.tags).toContain("Design");
});