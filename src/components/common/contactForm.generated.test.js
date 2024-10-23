import renderer from 'react-test-renderer';
import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ContactForm from "./contactForm";

jest.mock("@mui/material");
jest.mock("react-i18next");

const renderTree = tree => renderer.create(tree);
describe('<ContactForm>', () => {
  it('should render component', () => {
    expect(renderTree(<ContactForm 
    />).toJSON()).toMatchSnapshot();
  });
  
});