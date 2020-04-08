export default interface RouteInterface 
{
    path: Function | string;
    component: React.ComponentType<any>;
    exact?: boolean
}