export const mockProject: IProject = {
    id: 1,
    name: "House Contruction Johar Town",
    total: 4000,
    children: [
        {
            id: 1,
            type: "resource_container",
            name: "Foundation",
            total: 2000,
            children: [
                {
                    id: 2,
                    type: "resource",
                    name: "Fauji Cement",
                    unitPrice: 1000,
                    sku: "kg",
                    quantity: 2,
                    total: 2000,
                },
            ],
        },
        {
            id: 3,
            type: "sub_project",
            name: "Remaning",
            total: 12000,
            children: [
                {
                    id: 4,
                    type: "sub_project",
                    name: "Remaning",
                    total: 12000,
                    children: [
                        {
                            id: 5,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 6,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 7,
                                    type: "resource",
                                    name: "Bricks",
                                    unitPrice: 10,
                                    sku: "unit",
                                    quantity: 1000,
                                    total: 10000,
                                },
                            ],
                        },
                        {
                            id: 5,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 6,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 7,
                                    type: "resource",
                                    name: "Bricks",
                                    unitPrice: 10,
                                    sku: "unit",
                                    quantity: 1000,
                                    total: 10000,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 4,
                    type: "sub_project",
                    name: "Remaning",
                    total: 12000,
                    children: [
                        {
                            id: 5,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 6,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 7,
                                    type: "resource",
                                    name: "Bricks",
                                    unitPrice: 10,
                                    sku: "unit",
                                    quantity: 1000,
                                    total: 10000,
                                },
                            ],
                        },
                        {
                            id: 5,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 6,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 7,
                                    type: "resource",
                                    name: "Bricks",
                                    unitPrice: 10,
                                    sku: "unit",
                                    quantity: 1000,
                                    total: 10000,
                                },
                            ],
                        },
                    ],
                },
            ],
        }
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



