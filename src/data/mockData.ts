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
                            id: 8,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 9,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 10,
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
                    id: 11,
                    type: "sub_project",
                    name: "Remaning",
                    total: 12000,
                    children: [
                        {
                            id: 12,
                            type: "sub_project",
                            name: "Remaning",
                            total: 12000,
                            children: [
                                {
                                    id: 13,
                                    type: "resource_container",
                                    name: "Grey Structure",
                                    total: 12000,
                                    children: [
                                        {
                                            id: 14,
                                            type: "resource",
                                            name: "Fauji Cement",
                                            unitPrice: 1000,
                                            sku: "kg",
                                            quantity: 2,
                                            total: 2000,
                                        },
                                        {
                                            id: 15,
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
                                    id: 16,
                                    type: "resource_container",
                                    name: "Grey Structure",
                                    total: 12000,
                                    children: [
                                        {
                                            id: 17,
                                            type: "resource",
                                            name: "Fauji Cement",
                                            unitPrice: 1000,
                                            sku: "kg",
                                            quantity: 2,
                                            total: 2000,
                                        },
                                        {
                                            id: 18,
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
                            id: 19,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 20,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 21,
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
                            id: 22,
                            type: "resource_container",
                            name: "Grey Structure",
                            total: 12000,
                            children: [
                                {
                                    id: 23,
                                    type: "resource",
                                    name: "Fauji Cement",
                                    unitPrice: 1000,
                                    sku: "kg",
                                    quantity: 2,
                                    total: 2000,
                                },
                                {
                                    id: 24,
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

export const mockResources = [
    { name: "Cement", sku: "kg", unitPrice: 400 },
    { name: "Bricks", sku: "brick", unitPrice: 10 },
    { name: "Paint", sku: "Can", unitPrice: 3000 },
    { name: "Pipes", sku: "ft", unitPrice: 200 },
    { name: "Wires", sku: "kg", unitPrice: 400 },
    { name: "Wood", sku: "kg", unitPrice: 400 },
    { name: "Doors", sku: "kg", unitPrice: 400 },
    { name: "Windows Glass", sku: "kg", unitPrice: 400 },
    { name: "Tiles", sku: "kg", unitPrice: 400 },
    { name: "Blups", sku: "kg", unitPrice: 400 },
    { name: "Sockets", sku: "kg", unitPrice: 400 },
    { name: "Labour", sku: "kg", unitPrice: 400 },
    { name: "Skilled Labour", sku: "kg", unitPrice: 400 },
    { name: "Steel", sku: "kg", unitPrice: 400 },
]

export const mockData = {
    resources: mockResources,
    projects: [
        mockProject
    ]
}



