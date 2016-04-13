'use strict'

import Component from 'core/component.js'
import Input from 'react-input-autosize';

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
			open: false,
			inputValue: ''
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

		this._options = options;

		options = this.filterOptions(options);

		return (
			<div ref="selectWrapper" onClick={this.open}>
				<span>
					{this.renderInput()}
					{this.renderValue(this.getOptionLabel(this.getCurrentValue()))}
					<i className="fa fa-chevron-down pull-right" />
				</span>
				{this.renderDropDown(options)}
			</div>
		);


	}

	open(event) {
		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		this.setState({
			focus: true,
			open: true,
		});

		this.focus();
	}

	focus() {
		this.refs.input.focus();
	}

	blurInput() {
		this.refs.input.blur();
	}

	onInputBlur(event) {
		this.setState({
			open: false,
			inputValue: ''
		})
	}

	onInputChange(event) {
		this.setState({
			inputValue: event.target.value
		});
	}

	filterOptions(options) {
		let newOptions = [];
		let filterValue = this.state.inputValue.toLowerCase();

		options.forEach((option) => {
			let optionLabel = option.label.toLowerCase();

			if (optionLabel.indexOf(filterValue) >= 0) {
				newOptions.push(option);
			}
		});

		return newOptions;
	}

	getCurrentValue() {
		const style = getStyle(this.props.node, this.props.device)

		if (!this._value) {
			if (this._value != null) {
				if (style.get('fontFamily')) {
					this._value = style.get('fontFamily');
				}
			} else {
				this._value = null;
			}
		}

		if (!this._currentSelect) {
			this._currentSelect = this.props.node;
			this._value = style.get('fontFamily');
		}

		if (this._currentSelect != this.props.node) {
			this._currentSelect = this.props.node;
			this._value = style.get('fontFamily');
		}

		return this._value;
	}

	getOptionLabel(fontFamily) {
		let label = '';
		let option = this.getOption(fontFamily);

		if (option) {
			label = option.label;
		}

		return label;
	}

	getOption(fontFamily) {
		let options = this._options;
		let option  = null;

		options.forEach((_option) => {
			if (_option.value == fontFamily) {
				option = _option;
			}
		});

		return option;
	}

	renderInput() {
		return (
			<Input
				className="font-input"
				onBlur={this.onInputBlur}
				onChange={this.onInputChange}
				ref="input"
				value={this.state.inputValue}
			/>
		);
	}

	renderValue(fontFamily) {
		if (fontFamily) {
			if (!this.state.inputValue) {
				return (
					<span>{fontFamily}</span>
				);
			}
		} else {
			if (!this.state.inputValue) {
				return (
					<span>Font</span>
				);
			}
		}
	}

	renderDropDown(options) {
		if (this.state.open) {
			return (
				<ul onMouseOut={this.onOptionBlur} className="font-family-options">
					{this.renderOptions(options)}
				</ul>
			);
		}
	}

	renderOptions(options) {
		if (options && options.length) {
			return options.map((option, i) => {
				return (
					<li key={`value-${i}-{option.value}`} onMouseOver={event => this.onOptionFocus(option, event)} onMouseDown={event => this.onMouseDownOption(option, event)}>{option.label}</li>
				)
			})
		} else {
			return (
				<li>No results found.</li>
			)
		}
	}

	onMouseDownOption(option, event) {

		this._value = option.value;

		this.applyFont(option);

		this.blurInput();
	}

	onOptionFocus(option) {
		this.applyFont(option);
	}

	onOptionBlur() {
		let option = this.getOption(this._value);
		this.applyFont(option);
	}

	applyFont(option) {
		if (option) {
			mergeStyle(this.props.node, {
				fontFamily: option.value
			}, this.props.device)
		} else {
			removeProperties(this.props.node, {fontFamily:''}, this.props.device);
		}
	}
}