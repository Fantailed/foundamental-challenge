// I am well aware that this is hacky and only doing this because it is a time-limited challenge.
// TODO: Research how to do this properly

const pageNameDict: { [key: string]: string } = {
    '/': 'Overview',
    '/db/companies': 'Companies DB',
    '/db/deals': 'Deals DB',
    '/_error': 'Error',
}

export function route2pageName(route: string) {
    return pageNameDict[route];
}
