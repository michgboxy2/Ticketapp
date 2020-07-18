import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });
});

it("returns a 400 with an invalid email", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "password",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });
});

it("returns a 400 with an invalid password", async (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "p",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });
});

it("returns a 400 with missing email and password", async (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });

  request(app)
    .post("/api/users/signup")
    .send({
      password: "test",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) done(err);
      done();
    });
});

it("disallows duplicate emails", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201)
    .then((data) => {
      request(app)
        .post("/api/users/signup")
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
});

it("sets a cookie after successful signup", (done) => {
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201)
    .then((data) => {
      expect(data.get("Set-Cookie")).toBeDefined();
      done();
    });
});
