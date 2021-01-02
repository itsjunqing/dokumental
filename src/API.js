import axios from "axios";

export function POST(url, body, header) {
  return axios
    .post(url, body, header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export function GET(url, header) {
  return axios
    .get(url, header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
