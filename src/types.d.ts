interface IProjectResource {
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
    type: 'unkown' | 'sub_project' | 'resource_container'
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
    id: 1;
    name: string;
    sku: string;
    price: number;
}

interface IData {
    resources: IResource[];
    projects: IProject[];
}