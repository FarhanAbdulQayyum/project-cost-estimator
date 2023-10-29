export let data: IData = { resources: [], projects: [] };

export const getNewId = () => {
    if (!data.projects.length) return 1

    const previousId = data.projects.reduce((max: number, current: IProject) => {
        return current.id > max ? current.id : max;
    }, data.projects[0].id);

    return previousId + 1;
}

export const getProjectById = (id: number) => data.projects.find(project => project.id === id);

const findNodeById = (data: any, id: number): ISubProject => {
    let result = data;

    const search = (node: ISubProject) => {
        if (node.id === id) {
            result = node;
        }
        if (node.children) {
            node.children.forEach(search);
        }
    }

    search(data);

    return result;
}

const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    return timestamp;
}

export const addResource = (id: number, project: IProject): IProject => {
    const node = findNodeById(project, id);
    if (node.type === "unknown") node.type = "resource_container"
    if (node !== null) {
        node.children.push({
            id: generateUniqueId(),
            type: "resource",
            name: "",
            unitPrice: 0,
            sku: "",
            quantity: 0,
            total: 0,
        })
    }
    return project

}

export const addSubProject = (id: number, project: IProject, type = "sub_project"): IProject => {
    const node = findNodeById(project, id);
    if (node !== null) {
        node.children.push({
            id: generateUniqueId(),
            type: type,
            name: "New SubProject",
            total: 0,
            children: []
        })
    }
    return project

}