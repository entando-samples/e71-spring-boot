import {useState} from "react";
import './App.css';

const API_PATH = '/api/example'

function App({config}) {
    const {systemParams} = config || {};
    const { api } = systemParams || {};
    const url = api && api["be-api"].url
    const { params } = config || {};
    const { buttonlabel } = params || {};

    const [payload, setPayload] = useState("")

    async function callTheApi() {
        try {
            const token = window.entando.keycloak.token
            let init = {}
            if(token){
                init = {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
            }
            const apiResponse = await fetch(url + API_PATH, init);

            if (apiResponse.ok) {
                const apiJson = await apiResponse.json();
                setPayload(<>{apiJson.payload}<br/></>);
            } else {
                setPayload('Server responded with an error: ' + apiResponse.status);
            }
        } catch (error) {
            setPayload(error.message);
        }
    }

    return (
    <div className="App">
      <div>
        <button onClick={callTheApi}>{buttonlabel}</button>
      </div>
      <div>
        <span>{payload}</span>
      </div>
    </div>
  );
}

export default App;
