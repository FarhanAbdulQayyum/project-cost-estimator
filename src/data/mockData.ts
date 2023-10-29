export const mockProject: IProject = {
    id: 1,
    name: "House Contruction Johar Town",
    total: 4000,
    children: [
        {
            type: "resource",
            name: "Fauji Cement",
            unitPrice: 1000,
            sku: "kg",
            quantity: 2,
            total: 2000,
        },
        {
            type: "sub_project",
            name: "Foundation",
            total: 2000,
            children: [
                {
                    type: "resource",
                    name: "Fauji Cement",
                    unitPrice: 1000,
                    sku: "kg",
                    quantity: 2,
                    total: 2000,
                },
            ],
        },
    ],
};

export const mockData = {
    resources: [
        {
            id: 1,
            name: "Fauji Cement",
            sku: "kgs",
            price: 1000
        }
    ],
    projects: [
        mockProject
    ]
}



