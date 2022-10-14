const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}
const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        )
}

export const getRequests = () =>{
    let requestsCopy = structuredClone(applicationState.requests)
    return requestsCopy 
}

export const getPlumbers = () =>{
    let plumbersCopy = structuredClone(applicationState.plumbers)
    return plumbersCopy 
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const sendCompletion = (completedServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedServiceRequest)
    }
    
    fetch(`${API}/requests/${completedServiceRequest.requestId}`, { method: "DELETE" })
   
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
