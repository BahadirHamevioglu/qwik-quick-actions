import { QuickActions } from "./components/quick-actions/quick-actions";
import "./assets/styles/main.scss";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Quick Actions</title>
      </head>
      <body>
        <QuickActions />
      </body>
    </>
  );
};
