interface IProjectResource {
    id: number
    name: string;
    type: 'resource';
    unitPrice: number;
    sku: string;
    quantity: number;
    total: number;
}

type SubProjectOrResourceContainer<T> =
    T extends 'sub_project' ? ISubProject[] :
    T extends 'resource_container' ? IProjectResource[] :
    T extends 'unkown' ? any[] : never;

interface ISubProject {
    id: number
    type: 'unknown' | 'sub_project' | 'resource_container'
    name: string;
    total: number;
    children: subProjectOrResourceContainer<ISubProject['type']>
}

interface IProject {
    id: number;
    name: string;
    total: number;
    children: ISubProject[];
}

interface IResource {
    name: string;
    sku: string;
    unitPrice: number;
}

interface IData {
    resources: IResource[];
    projects: IProject[];
}

type ResourceModalMode = 'ADD' | 'EDIT'

interface IItemToRemoveItem {
    id: number;
    name: string
}

interface IItemToRemove {
    parentId: number,
    item: IItemToRemoveItem
}