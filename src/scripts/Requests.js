import { getRequests, deleteRequest, getPlumbers, sendCompletion } from "./dataAccess.js"
// "requests": [
//     {
//         "id": 1,
//         "description": "Aut sint voluptatem fugit eius quas molestiae modi.",
//         "address": "34445 Bianka Ports",
//         "budget": 400,
//         "neededBy": "2021-08-27"
//     }
// ]
const requestsStuffToMapForHTML = (request) => {
    // let aaaaaa = `<li class="requests">Request #${request.id}:Due ${request.neededBy},
    //  ${request.description},
    //  at ${request.address},
    //  budget is $${request.budget}.
    //  </li>`
    //  return aaaaaa
    const plumbers = getPlumbers()
    return `
     <li id="request--${request.id}">Request #${request.id}: Due ${request.neededBy},
     ${request.description},
     at ${request.address},
     budget is $${request.budget}.
         <button class="request__delete"
                 id="request--${request.id}">
             Delete
         </button>
     </li>
     <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
</select>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const date1 = new Date("Wed, 27 July 2016 13:30:00");
            const completion = {
                "requestId": requestId,
                "plumberId": plumberId,
                "date_created": date1
            }
            
            // Send the data to the API for permanent storage
            sendCompletion(completion)
            // deleteRequest(requestId)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(requestsStuffToMapForHTML).join("")
        }
        </ul>
    `

    return html
}