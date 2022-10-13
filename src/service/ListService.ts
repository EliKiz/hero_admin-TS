
export interface RequestHeroes { 
    id: string,
    name: string,
    description: string,
    element: string
}

interface RequestFilter { 
    id: string,
    value: string,
    label: string,
    colored: string,
    active: boolean
}

export const ListService = () => {

    const requestHeroes = async (url:string, method:string = 'GET', body?:string | null, headers = {'Content-Type': 'application/json'}):Promise<RequestHeroes[]> => {

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
           
            throw e;
        }
    };

    const requestFilter = async (url:string, method:string = 'GET', body?:string | null, headers = {'Content-Type': 'application/json'}):Promise<RequestFilter[]> => { 
        try { 
            const response = await fetch(url, {method, body, headers}) 
            
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch(e) { 
            throw e;
        }

    }
    
    return {requestHeroes, requestFilter}
}

export default ListService