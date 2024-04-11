export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {    
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesAdding = (hero) => {    
    return {
        type: 'HEROES_ADDING',
        payload: hero
    }
}

export const heroesDeleting = (id) => {    
    return {
        type: 'HEROES_DELETING',
        payload: id
    }
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {    
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}


export const heroesFiltering = (element) => {
    return {
        type: 'HEROES_FILTERING',
        payload: element
    }
}