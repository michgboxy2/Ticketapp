import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201)
    .then((data) => {
      request(app)
        .post("/api/users/signout")
        .send({})
        .expect(200)
        .then((data) => {
          done();
        });
    });
});
