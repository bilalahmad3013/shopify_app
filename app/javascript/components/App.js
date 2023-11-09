import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { AppProvider} from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import enTranslations from '@shopify/polaris/locales/en.json';
import React, { useState } from 'react';
import Home from './Home';
import { useEffect} from 'react';

export default function App(props) {
  const [session, setSession] = useState(null);
  const [a, setA] = useState(false) 
  const [selected, setSelected] = useState(0);

 
  const client = new ApolloClient({
    link: new createHttpLink({
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/graphql',
      },
    }),
    cache: new InMemoryCache()
  });
  const data = document.getElementById('shopify-app-init').dataset;
  const config = {
    apiKey: data.apiKey,
    shopOrigin: window.app.hostOrigin,
    host: new URLSearchParams(location.search).get("host")
  };

  useEffect(async () => {
    var SessionToken = window["app-bridge"].actions.SessionToken
    var app = window.app;

    app.dispatch(
      SessionToken.request(),
    );

    window.sessionToken = await new Promise((resolve) => {
      app.subscribe(SessionToken.Action.RESPOND, (data) => {
        resolve(data.sessionToken || "");
      });
    });
    let token = await window.sessionToken
    setSession(token);

  }, [])

  useEffect(() => {
    if (session !== null) {
      setA(true);
    }
  }, [session])  

  return (
    <Provider config={config} >
      <AppProvider i18n={enTranslations}>
        <ApolloProvider client={client}>
          { a && <Home token={session} shop_origin={props}/>}
        </ApolloProvider>
      </AppProvider>
    </Provider>
  );
}

