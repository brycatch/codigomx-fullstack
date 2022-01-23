import Server from ".";
import userRoutes from "../modules/user/routes";

const setRouting = () => {
  Server.instance.app.use(userRoutes);
};

export { setRouting };
