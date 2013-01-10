exports.list = function(req, res){

  var cbResponse = function (persons){

    if (persons.length == 0) {
      res.render('noresults', {title:"No results found"})
      return;
    };

    var tableEntries = "";

    for(var i=0; i < persons.length; i++){
      // HEADER IS DEFINED

      // <th>Firstname</th>
      // <th>Lastname</th>
      // <th>Birthdate</th>
      // <th>Email</th>
      // <th>Address</th>
      // <th>Phone</th>

      // Beggining each row
      tableEntries +="<tr>" ;

      // first name
      
      if (req.query["email"]) {
        tableEntries += "<td><span class=\"label label-warning\">Exposed</span></td>";
        tableEntries += "<td><span class=\"label label-warning\">Exposed</span></td>";
      }else {
        tableEntries += "<td>"+persons[i].FIRSTNAME+"</td>";
        tableEntries += "<td>"+persons[i].LASTNAME+"</td>"
      };
      
      // Birthdate

      if (persons[i].BIRTHDATE === true) {
        tableEntries += "<td><span class=\"label label-warning\">Exposed</span></td>"
      }
      else{
        tableEntries += "<td><span class=\"label\">Not Exposed</span></td>"
      }

      // Email 

      if (persons[i].EMAIL){
        tableEntries += "<td><span class=\"label label-warning\">Exposed</span></td>"
      }
      else{
        tableEntries += "<td><span class=\"label\">Not Exposed</span></td>"
      }

      // Address

      tableEntries += "<td>"

      if (persons[i].STREET === true){
        tableEntries +="<span class=\"label label-warning\">Street</span>"
      }

      if (persons[i].HOUSE_NR === true) {
        tableEntries +="<span class=\"label label-warning\">House Number</span>"
      }

      if (persons[i].POSTAL_CODE === true) {
        tableEntries +="<span class=\"label label-warning\">Postal Code</span>"
      }

      if (persons[i].CITY === true) {
        tableEntries +="<span class=\"label label-warning\">City</span>"
      }

      if (persons[i].COUNTRY === true) {
        tableEntries +="<span class=\"label label-warning\">Country</span>"
      }

      tableEntries += "</td>"

      // Phone

      tableEntries += "<td>"

      if (persons[i].PRIVATE_FIXED_TELEPHONE === true) {
        tableEntries +="<span class=\"label label-warning\">Home</span>"
      };

      if (persons[i].PRIVATE_MOBILE_TELEPHONE === true) {
        tableEntries +="<span class=\"label label-warning\">Mobile</span>"
      };
      if (persons[i].BUSINESS_TELEPHONE === true) {
        tableEntries +="<span class=\"label label-warning\">Business</span>"
      };

      tableEntries += "</td>"

      tableEntries += "</tr>";
    }

    res.render('passenger', { title: 'SNCB-Leak - Passengers', tableContent: tableEntries });
  }

  if (req.query["lastname"] && req.query["firstname"]) {

    var firstname = req.query["firstname"].toLowerCase();
    var lastname = req.query["lastname"].toLowerCase();

    Passenger_record.find({FIRSTNAME:firstname, LASTNAME:lastname}).limit(20).exec(function (err, queryResults){
      if (err) {
        console.log("Error :"+ err);
        res.send("An error occured, please contact frederic.jacobs@mac.com")
        return;
      };

      cbResponse(queryResults);

    })}else if(req.query["email"]){

          var email = req.query["email"].toLowerCase();
          
          var email_md5 = md5(email);

          Passenger_record.find({"EMAIL":email_md5}).limit(20).exec(function (err, queryResults){
           if (err) {
            console.log("Error :"+ err);
            res.send("An error occured, please contact frederic.jacobs@mac.com")
            return;
          };
          cbResponse(queryResults);
        });
        }else{
         res.send("Make sure you entered a first name and last name. Back to <a href=\"http://sncb.fredericjacobs.com\"> the start</a>");
       }
       
     }
