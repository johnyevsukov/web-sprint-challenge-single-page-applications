describe("MVP tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/pizza");
    });
  
    const nameInput = () => cy.get('input[name="name"]');
    const specialInput = () => cy.get('input[name="special"]');
    const onionsInput= () => cy.get('input[name="onions"]')
    const mushroomsInput= () => cy.get('input[name="mushrooms"]')
    const olivesInput= () => cy.get('input[name="olives"]')
    const pepperoniInput= () => cy.get('input[name="pepperoni"]')
    const submitBtn = () => cy.get('button[id="order-button"]');
  
    it("sanity test to make sure my tests work", () => {
      expect(1 + 2).to.equal(3);
      expect(2 + 2).not.to.equal(5);
    });
  
    it("can type in the inputs", () => {
        nameInput()
          .should("have.value", "")
          .type("John")
          .should("have.value", "John");
    
        specialInput()
          .should("have.value", "")
          .type("extra sauce please")
          .should("have.value", "extra sauce please");
      });

      it("can select multiple toppings", () => {
        onionsInput()
          .should("not.be.checked")
          .check()
          .should("be.checked");
    
        mushroomsInput()
          .should("not.be.checked")
          .check()
          .should("be.checked");

        olivesInput()
          .should("not.be.checked")
          .check()
          .should("be.checked");

        pepperoniInput()
          .should("not.be.checked")
          .check()
          .should("be.checked");
      });

      it("can submit form", () => {
        submitBtn().should("be.disabled")
        nameInput()
          .type("John")
        submitBtn().should("be.enabled")
        submitBtn().click()
        nameInput()
        .should("have.value", "")
        //Since we are not adding our order to the page
        //(only the database) I do not have anything to 
        //check the results against.
        //I can only check that submit is enabled
        //and that the name input goes back to blank
        //after clicking submit.
      });
  });