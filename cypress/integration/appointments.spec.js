describe("Appointments", () => {
  beforeEach(() => {
    //Reset the db everytime the test is run
    cy.request("GET", "/api/debug/reset");

    //visit the root of web server
    cy.visit("/");

    //confirm DOM contains Monday
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();

    // Type the student name in the input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //Click on the interviewer Sylvia Palmer
    cy.get("[alt='Sylvia Palmer']").click();

    //click save
    cy.contains("Save").click();

    //Check if appointment with Student and interviewer name along with Show component exists
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //Clicks on the "Edit" button in the first appointment
    cy.get("[alt=Edit]").first().click({force:true});

    // Type the student name in the input field
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    //Click on the interviewer Tori Malcolm
    cy.get("[alt='Tori Malcolm']").click();

    //click save
    cy.contains("Save").click();

    //Check if appointment with Student and interviewer name along with Show component exists
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
    
  });

  it("should cancel an interview", () => {
    //Clicks on the "Delete" button in the first appointment
    cy.get("[alt=Delete]").first().click({force:true});

    //Clicks the confirm button
    cy.contains("Confirm").click();

    //Checks if deleteing indicator exists
    cy.contains("Deleting").should("exist");

    //Checks if deleteing indicator does not exist
    cy.contains("Deleting").should("not.exist");

    //Checks if appointment with student name Archie Cohen does not exist
    cy.contains("appointment__card--show","Archie Cohen").should("not.exist");
  })
});
