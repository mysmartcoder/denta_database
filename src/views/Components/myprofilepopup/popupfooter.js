import React, { Component } from "react";
import Button from "../Buttons/Btnpurple/btnpurple";
import ButtonGreen from "../Buttons/Btnpurple/btngreen";
class Myprofilepopupfooter extends Component {
    render() {
        return (
            <div className="pt-md-3 pt-1 text-right">
                {this.props.isRemove && (
                    <Button
                        loader={this.props.loader}
                        type="button"
                        onClick={this.props.onClickRemove}
                        value="Remove"
                        styleClass="mr-2"
                    />
                )}
                <ButtonGreen
                    type="button"
                    onClick={this.props.onModalClick}
                    value="Cancel"
                    styleClass="mr-2"
                />
                <Button
                    loader={this.props.loader}
                    type="submit"
                    value={this.props.value}
                />
            </div>
        );
    }
}
export default Myprofilepopupfooter;
