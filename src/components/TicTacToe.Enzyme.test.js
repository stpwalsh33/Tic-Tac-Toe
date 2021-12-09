import React from "react";
import TicTacToe from "./TicTacToe";
import { mount } from "enzyme";

function renderTicTacToe() {
	return mount(<TicTacToe />);
}

it("should render GameMenu", () => {
	const wrapper = renderTicTacToe();
	expect(wrapper.find("GameMenu").length).toBe(1);
});

it("new Board should render, Squares should be empty", () => {
	const wrapper = renderTicTacToe();
	wrapper.find("button[name='one-player']").simulate("click");

	const squares = wrapper.find("Square");
	squares.at(0).simulate("click");
	squares.at(1).simulate("click");
	squares.at(4).simulate("click");
	squares.at(2).simulate("click");
	squares.at(8).simulate("click");

	wrapper.find("PlayAgain button").simulate("click");
	expect(wrapper.find("Board").length).toBe(1);
	expect(wrapper.find("PlayAgain").length).toBe(0);
	wrapper.find("Square").forEach(square => expect(square.text()).toBe(""));
});
