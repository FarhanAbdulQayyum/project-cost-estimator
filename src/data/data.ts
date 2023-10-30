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

export const addResourceInState = (id: number, project: IProject, resource: Partial<IProjectResource>): IProject => {
    const node = findNodeById(project, id);
    if (node.type === "unknown") node.type = "resource_container"
    if (node !== null) {
        node.children.push({
            id: generateUniqueId(),
            type: "resource",
            name: resource.name,
            unitPrice: resource.unitPrice,
            sku: resource.sku,
            quantity: resource.quantity,
            total: resource.total,
        })
    }
    return project

}
export const updateResourceInState = (id: number, project: IProject, updateResource: Partial<IProjectResource>): IProject => {
    const node = findNodeById(project, id);
    if (node !== null) {
        const resouceToUpdateIndex = node.children.findIndex((child: ISubProject) => child.id === updateResource.id)
        node.children[resouceToUpdateIndex] = updateResource
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

export const renameItem = (id: number, project: IProject, updatedName: string): IProject => {
    const node = findNodeById(project, id);
    if (node !== null) {
        node.name = updatedName
    }
    return project;
}