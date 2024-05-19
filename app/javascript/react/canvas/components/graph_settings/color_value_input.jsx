import React from "react";

export function ColorInput({ name, label, value, onChange }) {
  return (
    <>
      <label htmlFor={`${name}Input`}>{label}</label>
      <input 
        name={name}
        id={`${name}Input`}
        type='color' 
        value={value}
        onChange={onChange}
        style={{ width: '60px' }} />
    </>
)}

export function ValueInput({ name, label, value, step, onChange }) {
  return (
    <>
      <label htmlFor={`${name}Input`}>{label}</label>
      <input 
        name={name}
        id={`${name}Input`}
        type='number' 
        value={value}
        step={step} 
        onChange={onChange}
        style={{ width: '60px' }} />
    </>
)}
