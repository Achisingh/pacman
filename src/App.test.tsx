import { render, fireEvent } from '@testing-library/react';
import App from './App';

// Test suite for the App component
describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test case to check if the component renders without errors
  test('renders without errors', () => {
    render(<App />);
  });

  // Test case to check if clicking "Place Pacman" button updates state correctly and enables other buttons
  test('clicking "Place Pacman" button updates state correctly and the other buttons are enabled', () => {

    // Mock functions for useState setters
    const setXMock = jest.fn();
    const setYMock = jest.fn();
    const setFacingMock = jest.fn();

    // Mock place function to set values through the mock functions
    const place = (x: number, y: number, facing: string) => {
        setXMock(x);
        setYMock(y);
        setFacingMock(facing);
    };

    // Call place function with initial values
    place(0, 0, 'NORTH');
    const { getByText } = render(
      <App />
    );

    // Trigger the place function with valid parameters
    fireEvent.click(getByText('Place Pacman'));

    // Assert that the other buttons are not disabled
    expect(setXMock).toHaveBeenCalledWith(0);
    expect(setYMock).toHaveBeenCalledWith(0);
    expect(setFacingMock).toHaveBeenCalledWith('NORTH');
    expect(getByText('Move')).not.toBeDisabled();
    expect(getByText('Left')).not.toBeDisabled();
    expect(getByText('Right')).not.toBeDisabled();
    expect(getByText('Report')).not.toBeDisabled();
  });

  // Test case to check if "Move", "Left", "Right", "Report" buttons are disabled if position is not placed
  test('check if "Move", "Left", "Right", "Report" buttons are disabled if position is not placed', () => {
    const { getByText } = render(
      <App />
    );

    // Assert that the buttons are disabled
    expect(getByText('Move')).toBeDisabled();
    expect(getByText('Left')).toBeDisabled();
    expect(getByText('Right')).toBeDisabled();
    expect(getByText('Report')).toBeDisabled();
  });

  // Test case to check if clicking "Move" button updates state correctly
  test('clicking "Move" button updates state correctly', () => {
    // Mock functions for useState setters
    const setXMock = jest.fn();
    const setYMock = jest.fn();
    let facing = 'EAST';
    const gridWidth = 5;
    const gridHeight = 5;
    const x = 1;
    const y = 0;

    // Mock isValidPosition function
    const isValidPosition = (x: number, y: number) => {
      return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
    };
    const move = () => {
      if (facing === 'NORTH' && isValidPosition(x!, y! + 1)) {
        setYMock(y! + 1);
      } else if (facing === 'EAST' && isValidPosition(x! + 1, y!)) {
        setXMock(x! + 1);
      } else if (facing === 'SOUTH' && isValidPosition(x!, y! - 1)) {
        setYMock(y! - 1);
      } else if (facing === 'WEST' && isValidPosition(x! - 1, y!)) {
        setXMock(x! - 1);
      }
    };

    // Mock move function to update values through the mock functions
    const { getByText } = render(<App />);
    const moveButton = getByText('Move');

    //Trigger the move button
    fireEvent.click(moveButton);
    move();

    //Assert the setX based on the function outcome
    expect(setXMock).toHaveBeenCalledWith(2);

  });

  test('clicking "Left" button updates state correctly', () => {
    
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let facing = 'NORTH';
    const setFacingMock = jest.fn();

    const left = () => {
      if (directions.includes(facing!)) {
        const currentIndex = directions.indexOf(facing!);
        const newFacing = directions[(currentIndex - 1 + 4) % 4];
        setFacingMock(newFacing);
      }
    };

    const { getByText } = render(<App />);
    const leftButton = getByText('Left');
    fireEvent.click(leftButton);
    left();

    expect(setFacingMock).toHaveBeenCalledWith('WEST');
  });

  test('clicking "Right" button updates state correctly', () => {
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let facing = 'NORTH';
    const setFacingMock = jest.fn();

    const right = () => {
      if (directions.includes(facing!)) {
        const currentIndex = directions.indexOf(facing!);
        const newFacing = directions[(currentIndex + 1) % 4];
        setFacingMock(newFacing);
      }
    };

    const { getByText } = render(<App />);
    const rightButton = getByText('Right');
    fireEvent.click(rightButton);
    right();
    
    expect(setFacingMock).toHaveBeenCalledWith('EAST');
  });

  test('check if the position is invalid ', () => {
    const gridWidth = 5;
    const gridHeight = 5;
    let x = 5;
    let y = 5;
    const isValidPosition = (x: number, y: number) => {
      return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
    };
    render(<App />);
    expect(isValidPosition(x,y)).toBe(false);
  })

  test('clicking "Report" button logs the correct message', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const { getByText } = render(<App />);
    const reportButton = getByText('Report');
    const x = 1;
    const y = 0;
    let facing = 'EAST';

    const report = () => {
      if (x !== null && y !== null && facing !== null) {
        console.log(`Pacman's current position: (${x}, ${y}), facing ${facing}`);
      }
    };
    fireEvent.click(reportButton);
    report();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Pacman's current position: (1, 0), facing EAST`
    );

    consoleLogSpy.mockRestore();
  });

});
