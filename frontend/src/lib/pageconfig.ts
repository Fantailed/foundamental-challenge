// I am well aware that this is hacky and only doing this because it is a time-limited challenge.
// TODO: Research how to do this properly

const pageNameDict: { [key: string]: string } = {
    '/': 'Overview',
    '/db/companies': 'Companies',
    '/db/deals': 'Deals',
    '/_error': 'Error',
}

export function route2pageName(route: string) {
    return pageNameDict[route];
}
