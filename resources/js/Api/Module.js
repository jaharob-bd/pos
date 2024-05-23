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
                menu_name: "Manage Property",
                controller_name: "ManageProperty",
                routeUrl: "ManageProperty"
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