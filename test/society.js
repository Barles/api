const expect = require('chai').expect;
const axios = require('axios')

describe("Test API", function() {
  describe("Create", function() {
    let url = "http://localhost:4000/society";
    const society = {
      name: 'Test Society'
    }

    it("returns status 200", function(done) {
      axios.post(url, society)
        .then(response => {
          expect(response.status).to.equal(200);
          done();
        })
    });

    it("returns status 400", function(done) {
      axios.post(url, {})
        .catch(err => {
          expect(err.response.status).to.equal(400);
          done();
        })
    });
  });

  describe("Get", function() {
    let url = "http://localhost:4000/society"
    let societyId = null

    it("returns status 200", function(done) {
      axios.get(url)
        .then(response => {
          expect(response.status).to.equal(200);
          societyId = response.data[0].id
          done();
        })
    });

    it("returns a unique society", function(done) {
      axios.get(`${url}?id=${societyId}`)
        .then(response => {
          expect(response.data[0].id).to.equal(societyId);
          done();
        })
    });
  });

  describe("Update", function() {
    let url = "http://localhost:4000/society"
    let societyId = null

    axios.get(url)
      .then(response => {
        societyId = response.data[0].id
      })

    it("update", function(done) {
      axios.put(`${url}/${societyId}`, {
        name: 'Updated Name'
      })
        .then(response => {
          expect(response.status).to.equal(200);
          axios.get(`${url}?id=${societyId}`)
            .then(response => {
              expect(response.data[0].name).to.equal('Updated Name');
              done();
            })
        })
    });

    it("returns status code 400", function(done) {
      axios.put(`${url}/iohazor`, {})
        .then(resp => {
          expect(resp.data.message).to.equal(`Cannot update society with id iohazor`);
          done();
        })
    });
  });

  describe("Delete", function() {
    let url = "http://localhost:4000/society"
    let societyId = null

    axios.get(url)
      .then(response => {
        societyId = response.data[0].id
      })

    it("returns status 200", function(done) {
      axios.delete(`${url}/${societyId}`)
        .then(response => {
          expect(response.status).to.equal(200);
          done();
        })
    });

    it("returns that society doesn't exists anymore", function(done) {
      axios.get(`${url}?id=${societyId}`)
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.data.length).to.equal(0);
          done();
        })
    });
  });
});
