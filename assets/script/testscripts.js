const adminCreaterTester = document.getElementById('adminCreaterTester');

adminCreaterTester.addEventListener('click',function () {
    
    var pass = document.getElementById("pass").value;

    argon2.hash({
      // required
      pass: pass,
      salt: 'somesalt',
      time: 2,
      mem: 16384,
      hashLen: 32,
      parallelism: 2, 
      type: argon2.ArgonType.Argon2id
    })
    // result
    .then(res => {
      console.log(res.encoded );
      tester(res.encoded);
    })
    // or error
    .catch(err => {
    console.log("errMessage:" + err.message); // error message as string, if available
    console.log("errCode:" + err.code); // numeric error code
    })
  })

  function tester(encoded) {
    var name = document.getElementById("unm").value;
    console.log(name);
    console.log(encoded);

    argon2.verify({
        pass: name,
        salt: encoded,
        })
    .then(() => {
        console.log("Yes");
    })
    .catch(err => {
      console.log("errMessageVer:" + err.message); // error message as string, if available
      console.log("errCodeVer:" + err.code); // numeric error code
    })
  }