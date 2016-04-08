'use strict'

import Component from 'core/component.js'
import Select from 'react-select-plus'

// Actions
import {
    replaceStyle,
    mergeStyle,
    getStyle,
    getCascade,
    removeProperties
} from 'core/actions/styling.js'

export default class Font extends Component {

	initialState() {
		return {
			focus: false,
			open: false,
			option: null,
		}
	}

	render() {
		const style = getStyle(this.props.node, this.props.device)

		let options = [
		    // Sans Serif
		    { label: 'Arial', value: 'Arial, "Helvetica Neue", Helvetica, sans-serif'},
		    { label: 'Arial Black', value: '"Arial Black", "Arial Bold", Gadget, sans-serif'},
			{ label: 'Arial Narrow', value: '"Arial Narrow", Arial, sans-serif'},
			{ label: 'Arial Rounded MT Bold', value: '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif'},
			{ label: 'Avant Garde', value: '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif'},
			{ label: 'Calibri', value: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif'},
			{ label: 'Candara', value: 'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif'},
			{ label: 'Century Gothic', value: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif'},
			{ label: 'Franklin Gothic Medium', value: '"Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", Arial, sans-serif'},
			{ label: 'Futura', value: 'Futura, "Trebuchet MS", Arial, sans-serif'},
			{ label: 'Geneva', value: 'Geneva, Tahoma, Verdana, sans-serif'},
			{ label: 'Gill Sans', value: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif'},
			{ label: 'Helvetica', value: '"Helvetica Neue", Helvetica, Arial, sans-serif'},
			{ label: 'Impact', value: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans serif'},
			{ label: 'Lucida Grande', value: '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif'},
			{ label: 'Optima', value: 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif'},
			{ label: 'Segoe UI', value: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'},
			{ label: 'Tahoma', value: 'Tahoma, Verdana, Segoe, sans-serif'},
			{ label: 'Trebuchet MS', value: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif'},
			{ label: 'Verdana', value: 'Verdana, Geneva, sans-serif'},
			// Serif
			{ label: 'Baskerville', value: 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif'},
			{ label: 'Big Caslon', value: '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif'},
			{ label: 'Bodoni MT', value: '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif'},
			{ label: 'Book Antiqua', value: '"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif'},
			{ label: 'Calisto MT', value: '"Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif'},
			{ label: 'Cambria', value: 'Cambria, Georgia, serif'},
			{ label: 'Didot', value: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif'},
			{ label: 'Garamond', value: 'Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif'},
			{ label: 'Georgia', value: 'Georgia, Times, "Times New Roman", serif'},
			{ label: 'Goudy Old Style', value: '"Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif'},
			{ label: 'Hoefler Text', value: '"Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif'},
			{ label: 'Lucida Bright', value: '"Lucida Bright", Georgia, serif'},
			{ label: 'Palatino', value: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'},
			{ label: 'Perpetua', value: 'Perpetua, Baskerville, "Big Caslon", "Palatino Linotype", Palatino, "URW Palladio L", "Nimbus Roman No9 L", serif'},
			{ label: 'Rockwell', value: 'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif'},
			{ label: 'Rockwell Extra Bold', value: '"Rockwell Extra Bold", "Rockwell Bold", monospace'},
			{ label: 'Times New Roman', value: 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'},
			// Monospaced
			{ label: 'Andale Mono', value: '"Andale Mono", AndaleMono, monospace'},
			{ label: 'Consolas', value: 'Consolas, monaco, monospace'},
			{ label: 'Courier New', value: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace'},
			{ label: 'Lucida Console', value: '"Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace'},
			{ label: 'Lucida Sans Typewriter', value: '"Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace'},
			{ label: 'Monaco', value: 'Monaco, Consolas, "Lucida Console", monospace'},
			// Fantasy
			{ label: 'Copperplate', value: 'Copperplate, "Copperplate Gothic Light", fantasy'},
			{ label: 'Papyrus', value: 'Papyrus, fantasy'},
			// Script
			{ label: 'Brush Script MT', value: '"Brush Script MT", cursive'},
		];

		// options = [
		// 	{label: 'One', value: 'one'},
		// 	{label: 'Two', value: 'two'},
		// 	{label: 'Three', value: 'three'},
		// 	{label: 'Four', value: 'four'},
		// ];

		// return (
		// 	<Select
		// 	    name="fontFamily"
		// 	    options={options}
		// 	    onChange={this.onChange}
		// 	/>
		// );

		return (
			<div ref="selectWrapper" onClick={this.open}>
				<span className="family">
					<input ref="selectInput" type="text" placeholder="Font" />
					<i className="fa fa-chevron-down pull-right" />
				</span>
				{this.renderValue()}
				{this.renderDropDown(options)}
			</div>
		);

	}

	open() {
		this.setState({
			focus: true,
			open: true,
		});
		console.log('open..');
	}

	handleOnBlur() {
		this.setState({
			open: false
		});
	}

	renderValue() {
		if (this.state.option) {
			return (
				<span>{this.state.option.label}</span>
			);
		}
	}

	renderDropDown(options) {
		if (this.state.open) {
			return (
				<ul onMouseOut={this.onOptionBlur}>
					{options.map((option, i) => {
						return (
							<li onMouseOver={event => this.onOptionFocus(option)} onClick={this.onOptionClick(option)}>{option.label}</li>
						)
					})}
				</ul>
			);
		}
	}

	onOptionClick(option) {
		this.setState({
			open: false,
			option: option
		});

		this.applyFont(option);
	}

	onOptionFocus(option) {
		this.applyFont(option);
	}

	onOptionBlur() {
		this.applyFont(this.state.option);
	}

	applyFont(option) {
		if (option) {
			mergeStyle(this.props.node, {
				fontFamily: option.value
			}, this.props.device)
		} else {
			// 	removeProperties(this.props.node, {fontFamily})
		}
	}

	onChange(val) {
		console.log('change..');
	}
}