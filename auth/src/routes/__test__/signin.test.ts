import request from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is passed", async (done) => {
  request(app)
    .post("/api/users/signin")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });
});

it("fails when incorrect password is supplied", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201)
    .then((data) => {
      request(app)
        .post("/api/users/signin")
        .send({
          email: "test2@test.com",
          password: "passworde",
        })
        .expect(400)
        .end(function (err, res) {
          if (err) done(err);
          done();
        });
    });
});

it("responds with cookie with a valid credentials", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201)
    .then((data) => {
      request(app)
        .post("/api/users/signin")
        .send({
          email: "test@test.com",
          password: "password",
        })
        .expect(200)
        .then((data) => {
          expect(data.get("Set-Cookie")).toBeDefined();
          done();
        });
    });
});
