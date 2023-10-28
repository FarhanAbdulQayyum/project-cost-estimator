export let data: IData = { resources: [], projects: [] };

export let isData = false;

export const getNewId = () => {
    if (!data.projects.length) return 1

    const previousId = data.projects.reduce((max: number, current: IProject) => {
        return current.id > max ? current.id : max;
    }, data.projects[0].id);

    return previousId + 1;
}