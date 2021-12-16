import React, { useState } from "react";
import { IntlProvider } from "react-intl";

import Header from "./components/header/Header";
import Container from "./components/container/container";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";

import "./app.scss";

const App: React.FC = () => {
  const local = JSON.parse(localStorage.getItem('internationalization')!)
  const defaultLanguage = {
    value: LOCALES.ENGLISH
  }


  // TODO
  const [locale, setLocale] = useState<Record<string, string>>(!local ? defaultLanguage : local);

  return (
    <IntlProvider
      messages={messages[locale.value]}
      locale={locale.value}
    >
      <Header setLocale={setLocale} />
      <Container />
    </IntlProvider>
  );
};

export default App;