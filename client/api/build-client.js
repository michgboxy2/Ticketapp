import axios from "axios";

export default ({
  req
}) => {
  if (typeof window === "undefined") {
    //we are on ther server
    return axios.create({
      // baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      baseURL: 'http://www.aldra.com.ng',
      headers: req.headers,
    });
  } else {
    //we must be in the browser
    return axios.create({
      baseURL: "/",
    });
  }
};