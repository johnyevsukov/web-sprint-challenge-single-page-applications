import React from "react";

export default function Form(props){
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
      };
    
      const onChange = (evt) => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
      };
 
    return(
        <form id="pizza-form" onSubmit={onSubmit}>
            <div>
                <h2>Place an Order</h2>
                <div className="errors">
                    <div>{errors.name}</div>
                    {/* <div>{errors.size}</div> */}
                </div>
            </div>

            <div className="form-group inputs">
                <label>
                Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name="name"
                        type="text"
                        id="name-input"
                    />
                </label>

                <label>
                Size
                    <select onChange={onChange} value={values.size} name="size" id="size-dropdown">
                        <option value="">- Select a pizza size -</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                        <option value="x-large">x-large</option>
                    </select>
                </label>

                <label>
                Special instructions
                    <input
                        value={values.special}
                        onChange={onChange}
                        name="special"
                        type="text"
                        id="special-text"
                    />
                </label>
            </div>

            <div className="form-group checkboxes">
                <h4>Toppings</h4>

                <label>
                Onions
                    <input
                        type="checkbox"
                        name="onions"
                        checked={values.onions}
                        onChange={onChange}
                    />
                </label>

                <label>
                Mushrooms
                    <input
                        type="checkbox"
                        name="mushrooms"
                        checked={values.mushrooms}
                        onChange={onChange}
                    />
                </label>

                <label>
                Olives
                    <input
                        type="checkbox"
                        name="olives"
                        checked={values.olives}
                        onChange={onChange}
                    />
                </label>

                <label>
                Pepperoni
                    <input
                        type="checkbox"
                        name="pepperoni"
                        checked={values.pepperoni}
                        onChange={onChange}
                    />
                </label>
            </div>
            <button disabled={disabled} id="order-button">Add to Order</button>
        </form>
    )
}