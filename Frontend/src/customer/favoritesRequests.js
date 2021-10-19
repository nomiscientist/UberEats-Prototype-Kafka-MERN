import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const session = getSessionCookie();

    const getFavoriteRestaurants = async () => {
    try {
        const response = await fetch(
          `http://${NODE_HOST}:${NODE_PORT}/getFavoriteRestaurants`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: session.primaryID,
            }),
          }
        );
  
   return ( await response.json());
  } catch (error) {
    console.log(error);
    return (error);
  }
}

export {
    getFavoriteRestaurants,
  };