interface IProjectResource {
    name: string;
    type: 'resource';
    unitPrice: number;
    sku: string;
    quantity: number;
    total: number;
}

interface ISubProject {
    type: 'sub_project'
    name: string;
    total: number;
    children: (ISubProject[] | IProjectResource[])
}

interface IProject {
    id: number;
    name: string;
    total: number;
    children: (ISubProject | IProjectResource)[];
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