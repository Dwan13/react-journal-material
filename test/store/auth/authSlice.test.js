import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixture";

describe("Pruebas en el authSlice", () => {
  test("should return the inicial state and call the auth", () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("should be start the authentication", () => {
    //console.log(login(demoUser));
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("should do start the logout without parameters", () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout()
    );
    expect(state).toEqual({
      status: notAuthenticatedState.status,
      uid: notAuthenticatedState.uid,
      email: notAuthenticatedState.email,
      displayName: notAuthenticatedState.displayName,
      photoURL: notAuthenticatedState.photoURL,
      errorMessage: undefined,
    });
    console.log(state);
  });

  test("should do start the logout and give the error message", () => {
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer(
        authenticatedState,
        logout({errorMessage: errorMessage})
      );
      console.log(state);
      expect(state).toEqual({
        status: notAuthenticatedState.status,
        uid: notAuthenticatedState.uid,
        email: notAuthenticatedState.email,
        displayName: notAuthenticatedState.displayName,
        photoURL: notAuthenticatedState.photoURL,
        errorMessage: errorMessage,
      });
  });

  test("should be change state checking", () => {
    const state = authSlice.reducer(
        authenticatedState,
        checkingCredentials()
      );
      expect(state.status).toBe('checking');
  });
});
