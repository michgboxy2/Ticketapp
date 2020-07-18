import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201)
    .then((authResponse) => {
      const cookie = authResponse.get("Set-Cookie");

      request(app)
        .get("/api/users/currentUser")
        .set("Cookie", cookie)
        .send()
        .expect(200)
        .then((data) => {
          expect(data.body.currentUser.email).toEqual("test@test.com");
          done();
        });
    });
});

it("responds with null if not authenticated", (done) => {
  request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200)
    .then((data) => {
      expect(data.body.currentUser).toEqual(null);
      done();
    });
});
