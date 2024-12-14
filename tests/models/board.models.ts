export class Task {
    constructor(public taskLocator, public name,public tags) {
        this.taskLocator = taskLocator;
        this.name = name;
        this.tags = tags;
    }
}

export class Column {
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