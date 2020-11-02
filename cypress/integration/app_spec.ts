describe('Adding locations', () => {
  const getAmountOfPlaces = () =>
    cy.get("[data-cy='places']").then((places) => {
      const amount = places.find("[data-cy='place']")

      if (!amount) {
        return 0
      }

      return amount.length
    })

  beforeEach(() => {
    // Navigate to the main page
    cy.visit('')
  })

  it('can add a new location', () => {
    const newPlaceName = `My new place ${Date.now()}`

    // Get the amount of places before adding one
    getAmountOfPlaces().then((originalAmount) => {
      // Set the name of the new place
      cy.get("[data-cy='add-place:input']") // Select the input field
        .type(newPlaceName)
        .should('have.value', newPlaceName)

      // Add the new place
      cy.get("[data-cy='add-place:submit']").click()

      // Assert that we indeed added a new place
      getAmountOfPlaces().should('eq', originalAmount + 1)
      cy.contains(newPlaceName)
    })
  })

  it('cannot add a new location without a name', () => {
    getAmountOfPlaces().then((originalAmount) => {
      // Attempt to add a place without filling a name first
      cy.get("[data-cy='add-place:submit']").click()

      // Check that the amount of places has not increased
      getAmountOfPlaces().should('eq', originalAmount)
    })
  })
})
