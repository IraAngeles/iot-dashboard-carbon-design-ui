// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import RepoTable from '../RepoPage/RepoTable';
import MeterDataService from '../../services/MeterDataService';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import './_ibm-plex-font.css';
import {
  Loading,
  InlineLoading,
  DatePicker,
  DatePickerInput,
} from 'carbon-components-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
} from 'carbon-components-react';

// import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

// import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// import DatePicker from './DatePicker';
// import DatePickerInput from './DatePickerInput';
// import DatePickerSkeleton from '../DatePicker/DatePicker.Skeleton';
// import WithState from '../../tools/withState';

const datePickerOnChangeActions = decorateAction([
  args => args.slice(0, args.length - 2),
]);

const patterns = {
  'Short (d{1,2}/d{4})': '\\d{1,2}/\\d{4}',
  'Regular (d{1,2}/d{1,2}/d{4})': '\\d{1,2}/\\d{1,2}/\\d{4}',
};

const sizes = {
  'Extra large size (xl)': 'xl',
  'Default size': undefined,
  'Small size (sm)': 'sm',
};

const props = {
  tabs: {
    selected: 0,
    triggerHref: '#',
    role: 'navigation',
  },
  tab: {
    href: '#',
    role: 'presentation',
    tabIndex: 0,
  },
  datePicker: () => ({
    id: 'date-picker',
    light: boolean('Light variant (light in <DatePicker>)', false),
    onChange: datePickerOnChangeActions('onPickerChange'),
    onClose: action('onClose'),
  }),
  datePickerInput: () => ({
    id: 'date-picker-input-id',
    className: 'some-class',
    size: select('Field size (size)', sizes, undefined) || undefined,
    labelText: text(
      'Label text (labelText in <DatePickerInput>)',
      'Date Picker label'
    ),
    pattern: select(
      'The date format (pattern in <DatePickerInput>)',
      patterns,
      'd{1,2}/d{4}'
    ),
    placeholder: text(
      'Placeholder text (placeholder in <DatePickerInput>)',
      'mm/dd/yyyy'
    ),
    disabled: boolean('Disabled (disabled in <DatePickerInput>)', false),
    invalid: boolean(
      'Show form validation UI (invalid in <DatePickerInput>)',
      false
    ),
    invalidText: text(
      'Form validation UI content (invalidText in <DatePickerInput>)',
      'A valid value is required'
    ),
    iconDescription: text(
      'Icon description (iconDescription in <DatePickerInput>)',
      'Icon description'
    ),
    onClick: action('onClick'),
    onChange: action('onInputChange'),
  }),
  active: boolean('Active (active)', true),
  withOverlay: boolean('With overlay (withOverlay)', false),
  small: boolean('Small (small)', false),
  description: text('Description (description)', 'Active loading indicator'),
  status: select(
    'Loading status (status)',
    ['inactive', 'active', 'finished', 'error'],
    'active'
  ),
  iconDescription: text(
    'Icon description (iconDescription)',
    'Active loading indicator'
  ),
  description: text(
    'Loading progress description (description)',
    'Loading data...'
  ),
  successDelay: number(
    'The duration for successful state before `onSuccess` fires (successDelay)',
    1500
  ),
  onSuccess: action('onSuccess'),
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

// const headers = [
//   {
//     key: 'name',
//     header: 'Name',
//   },
//   {
//     key: 'createdAt',
//     header: 'Created',
//   },
//   {
//     key: 'updatedAt',
//     header: 'Updated',
//   },
//   {
//     key: 'issueCount',
//     header: 'Open Issues',
//   },
//   {
//     key: 'stars',
//     header: 'Stars',
//   },
//   {
//     key: 'links',
//     header: 'Links',
//   },
// ];

const headers = [
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'Datetime',
    header: 'Date',
  },
  {
    key: 'mw_reading',
    header: 'Meter Reading (KW)',
  },
];

// const rows = [
//   {
//     id: '1',
//     name: 'Repo 1',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
//   {
//     id: '2',
//     name: 'Repo 2',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
//   {
//     id: '3',
//     name: 'Repo 3',
//     createdAt: 'Date',
//     updatedAt: 'Date',
//     issueCount: '123',
//     stars: '456',
//     links: 'Links',
//   },
// ];

// const rows = [
//   {
//     id: '1',
//     Datetime: '2013-07-01',
//     mw_reading: 1166,
//   },
//   {
//     id: '2',
//     Datetime: '2013-07-02',
//     mw_reading: 1000,
//   },
//   {
//     id: '3',
//     Datetime: '2013-07-03',
//     mw_reading: 9999,
//   },
// ];

// const GetData = () => {
//   componentDidMount() {
//     fetch('http://192.168.1.132:3001/api/v1/db/data/2013/07/2013/08/')
//     .then(res => res.json())
//     .then((data) => {
//       console.log(data);
//       this.setState({ contacts: data })
//     })
//     .catch(console.log)
//   };
// };

// state = {
//   meterdata: []
// }

// componentDidMount() {
//   fetch('http://192.168.1.132:3001/api/v1/db/data/2013/07/2013/08')
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data);
//     this.setState({ meterdata: data })
//   })
//   .catch(console.log)
// };

// const options =  {
//   "title": "Simple bar (discrete)",
//   "axes": {
//     "left": {
//       "mapsTo": "mw_reading"
//     },
//     "bottom": {
//       "mapsTo": "id",
//       "scaleType": "labels"
//     }
//   },
//   "height": "400px"
// }

const options = {
  title: 'Simple bar (discrete)',
  axes: {
    left: {
      mapsTo: 'value',
    },
    bottom: {
      mapsTo: 'group',
      scaleType: 'time',
    },
  },
  height: '400px',
};

let dateRange = [];

// const options =  {
//   "title": "Simple bar (discrete)",
//   "axes": {
//     "left": {
//       "mapsTo": "value"
//     },
//     "bottom": {
//       "mapsTo": "group",
//       "scaleType": "labels"
//     }
//   },
//   "height": "400px"
// }

// class LandingPage
const LandingPage = () => {
  // rows = this.props.meterdata;
  // return <div>LANDING PAGE</div>;
  const [rows, setRows] = useState([]);
  // const [date, setDate] = useState(new Date());
  // var [handleReady] = useState([]);
  // const [currentRows, setCurrentRows] = useState(null);

  const datePickerInputProps = props.datePickerInput();

  let data = [];
  let setLoadingState = false;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState('Submitting...');
  const [ariaLive, setAriaLive] = useState('off');

  rows.map(row => {
    return data.push({
      id: row.id,
      group: row.Datetime,
      value: row.mw_reading,
    });
  });

  // useEffect(() => {
  //   retrieveMeterDatabyYearMonth();
  // }, []);

  const retrieveMeterDatabyYearMonth = params => {
    MeterDataService.getByYearMonth(params)
      .then(response => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleChange = date => {
    console.log(date);
    // setDate(date);
    if (date.length === 2) dateRange = date;
  };

  // var dt = new Date();

  // dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

  const handleOnClick = () => {
    setLoadingState = true;
    setIsSubmitting(true);
    setAriaLive('assertive');

    // Instead of making a real request, we mock it with a timer
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setDescription('Submitted!');

      // To make submittable again, we reset the state after a bit so the user gets completion feedback
      setTimeout(() => {
        setSuccess(false);
        setDescription('Submitting...');
        setAriaLive('off');
      }, 1500);
    }, 2000);

    console.log('button' + dateRange);
    const date1 = new Date(dateRange[0]);
    const date2 = new Date(dateRange[1]);
    const params =
      `/v1/db/data` +
      `/${date1.getFullYear()}/${zeroPad(date1.getMonth() + 1, 2)}/${zeroPad(
        date1.getDate(),
        2
      )}` +
      `/${date2.getFullYear()}/${zeroPad(date2.getMonth() + 1, 2)}/${zeroPad(
        date2.getDate(),
        2
      )}`;

    // const params = `/v1/db/data` +
    // `/${dateRange[0].getFullYear()}/${zeroPad((dateRange[0].getMonth() + 1),2)}/${zeroPad(dateRange[0].getDate(),2)}` +
    // `/${dateRange[1].getFullYear()}/${zeroPad((dateRange[1].getMonth() + 1),2)}/${zeroPad(dateRange[1].getDate(),2)}`;

    console.log(params);

    retrieveMeterDatabyYearMonth(params);
  };
  // state = { data: rows,
  // 	options: {
  //     "title": "Simple bar (discrete)",
  //     "axes": {
  //       "left": {
  //         "mapsTo": "value"
  //       },
  //       "bottom": {
  //         "mapsTo": "group",
  //         "scaleType": "labels"
  //       }
  //     },
  //     "height": "400px"
  //   }
  // };

  return (
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-16">
          <Breadcrumb noTrailingSlash>
            <BreadcrumbItem>
              <a href="/">Getting started</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">
            Design &amp; build with Carbon
          </h1>
        </div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="About">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <h2 className="landing-page__subheading">
                      What is Carbon?
                    </h2>
                    <p className="landing-page__p">
                      <DatePicker
                        {...props.datePicker()}
                        minDate="01/01/2013"
                        maxDate="12/31/2018"
                        datePickerType="range"
                        dateFormat={text(
                          'The date format (dateFormat in <DatePicker>)',
                          'm/d/Y'
                        )}
                        onChange={handleChange}>
                        <DatePickerInput
                          {...datePickerInputProps}
                          id="date-picker-input-id-start"
                        />
                        <DatePickerInput
                          {...datePickerInputProps}
                          id="date-picker-input-id-end"
                        />
                      </DatePicker>
                      {/* Carbon is IBM’s open-source design system for digital
                      products and experiences. With the IBM Design Language as
                      its foundation, the system consists of working code,
                      design tools and resources, human interface guidelines,
                      and a vibrant community of contributors. */}
                    </p>
                    {isSubmitting || success ? (
                      <InlineLoading
                        style={{ marginLeft: '1rem' }}
                        description={description}
                        status={success ? 'finished' : 'active'}
                        aria-live={ariaLive}
                      />
                    ) : (
                      <Button onClick={handleOnClick}>Submit</Button>
                    )}
                    {/* <Button kind='primary'  onClick={handleOnClick}>Submit</Button> */}
                    {/* <Loading  description="Active loading indicator" withOverlay={false} active={setLoadingState}/> */}
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/tab-illo.png`}
                      alt="Carbon illustration"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Design">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    Rapidly build beautiful and accessible experiences. The
                    Carbon kit contains all resources you need to get started.
                    <RepoTable headers={headers} rows={rows} />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Develop">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    Carbon provides styles and components in Vanilla, React,
                    Angular, and Vue for anyone building on the web.
                    <SimpleBarChart data={data} options={options} />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--col-md-4 bx--col-lg-4">
          <h3 className="landing-page__label">The Principles</h3>
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Open</div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Modular</div>
        <div className="bx--col-md-4 bx--col-lg-4">Carbon is Consistent</div>
      </div>
    </div>
  );
};

export default LandingPage;
