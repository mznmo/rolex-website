import Button from "../../UI/Button";

export default function Checkout() {
  return (
    <>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" required />
        </label>
        <Button text="Checkout" />
      </form>
    </>
  );
}
