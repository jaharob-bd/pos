[
    {
        id: 1,
        menu_icon: "fa fa-catelog",
        menu_name: "Dashboard",
        parentId: '',
        routeUrl: "ManageProperty"
    },
    {
        id: 2,
        menu_icon: "fa fa-catelog",
        menu_name: "Catalog",
        parentId: 2,
        routeUrl: "",
        submenu: [
            {
                menu_name: "Product",
                controller_name: "ProductController",
                routeUrl: "/product"
            },
            {
                menu_name: "Varient",
                controller_name: "ProductController",
                routeUrl: "/varient"
            },
            {
                menu_name: "Band",
                controller_name: "ProductController",
                routeUrl: "/band"
            },
            {
                menu_name: "Attribute",
                controller_name: "ProductController",
                routeUrl: "/attribute"
            },
            {
                menu_name: "Manage Property",
                controller_name: "ProductController",
                routeUrl: "ProductController"
            },
            {
                menu_name: "Manage Property",
                controller_name: "ProductController",
                routeUrl: "ProductController"
            }
        ]
    },
    {
        id: 3,
        menu_icon: "fa fa-catelog",
        menu_name: "Property",
        parentId: 3,
        routeUrl: "",
        submenu: [
            {
                menu_name: "Manage Property",
                controller_name: "ManageProperty",
                routeUrl: "ManageProperty"
            }
        ]
    }
]