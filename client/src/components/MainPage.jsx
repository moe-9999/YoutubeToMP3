import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [responseData, setResponseData] = useState({});
  const [response, setResponse] = useState(null); // State to store the Axios response

  function secondsToMinutes (decimal) {
    if (isNaN(decimal)) {
      return 'Invalid time';
    }
  
    const totalSeconds = Math.floor(decimal);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${minutes} : ${formattedSeconds} minutes`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const videoID = document.getElementById('videoID').value.trim();

      console.log('Video ID:', videoID);

      const response = await axios.post('https://youtube-to-mp3-api-pth.vercel.app/server', {
        videoID,
      });

      setResponse(response); // Store the Axios response in state

      const { success, message, data } = response.data;

      if (success) {
        setResponseData(data);
      } else {
        console.error('error :' + message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

  const instructionData = [
    {
      id: 1,
      background: 'bg-green-400',
      textColor: 'text-green-700',
      outlineColor: 'outline-green-700',
      title: 'Start',
      paragraph: 'Paste YouTube url or enter keywords into the search box.',
    },
    {
      id: 2,
      background: 'bg-red-400',
      textColor: 'text-red-700',
      outlineColor: 'outline-red-700',
      title: 'Convert',
      paragraph: 'Click on the Convert button to start the proccess.',
    },
    {
      id: 3,
      background: 'bg-blue-400',
      textColor: 'text-blue-500',
      outlineColor: 'outline-blue-500',
      title: 'Download',
      paragraph:
        'Wait a moment for the link to be proccesed, and then download.',
    },
  ];

  const questionData = [
    {
      question:
        'Q: Is there any limit on the amount of files downloaded by per user?',
      answer:
        'A: No. Our website allows users to convert and download unlimited files with no limits',
    },
    {
      question: 'Q: Is there any hidden charges of MP3 YouTube?',
      answer:
        'A: No. Our website is absolutely free. You can convert videos from YouTube to MP3.',
    },
    {
      question: 'Q: What are the compatible devices for the conversion?',
      answer:
        'A: We offer the service that is compatible with all PC devices, smart phones and tablets.',
    },
    {
      question: 'Q: How to download YouTube video to Android mobile phone?',
      ul: true,
      ulContent: [
        {
          id: '1',
          text: '1. Access YouTube from your browser or open YouTube app on your Android device; after that, copy the video URL you wish to download.',
        },
        {
          id: '2',
          text: '2. Paste the URL into the search box. You also can enter keyword to look for the video you wish.',
        },
        {
          id: '3',
          text: '3. Select the format you wish to download then tap "Download". After a few seconds, you can download the file.',
        },
      ],
      answer:
        'A: No. Our website allows users to convert and download unlimited files with no limits',
    },
    {
      question: 'Q: Where do the downloaded files get saved?',
      answer:
        "A: Files you've downloaded are automatically saved in the Downloads folder or the 'download history' section on your device.",
    },
  ];

  return (
    <main className="my-20">
      <section className="max-w-[900px] mx-auto flex flex-col items-center px-10 lg:px-0 dark:text-white">
        <h1 className="text-4xl mb-1 md:text-[3rem] font-semibold text-center">
          YOUTUBE TO MP3 CONVERTER
        </h1>
        <p className="mb-12 dark:text-slate-400 text-slate-600 text-center">
          Convert and download YouTube videos to MP3.
        </p>

        <div className="min-w-1/2 relative">
          <form
            method="POST"
            id="form"
            className="relative mb-2"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full px-3 py-2 rounded-md bg-transparent backdrop-blur-lg text-slate-500 border border-1 outline-none border-slate-500 focus:bg-white focus:text-black placeholder:focus:text-gray-900 transition-all duration-150"
              type="text"
              placeholder="Input the YouTube link here"
              id="videoID"
            />
            <button
              type="submit"
              className="absolute right-[3px] top-1/2 -translate-y-1/2 min-h-[calc(100%-6px)] aspect-square bg-blue-500 text-white rounded-[4px]"
            >
              <i className="fas fa-arrow-right-long"></i>
            </button>
          </form>

          <p className="text-sm mb-12">
            By using our service you accept our{' '}
            <a className="text-blue-400 underline" href="#">
              Terms of Service
            </a>{' '}
            &{' '}
            <a className="text-blue-400 underline" href="#">
              Privacy Policy
            </a>
          </p>
          {response && response.data && response.data.success ? (
            <div className="download-container text-center items-center flex flex-col gap-[2px] px-3 py-5 bg-blue-700/15 dark:bg-slate-700/50 shadow-xl max-w-fit mx-auto rounded-md">
              <p className="text-lg max-w-[50ch]">{responseData.title}</p>
              <p className="text-slate-800 dark:text-slate-300">
                {secondsToMinutes(responseData.duration)}
              </p>
              <p className='text-slate-800 dark:text-slate-300 mb-2'>
                {(responseData.filesize / 1048576).toFixed(1)} MB
              </p>
              <a
                className="px-3 py-2 shadow-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition duration-150"
                href={responseData.link}
                target="_blank"
              >
                Download Now
              </a>
            </div>
          ) : null}
        </div>
      </section>
      <section className="max-w-[900px] mx-auto mt-12 dark:text-white">
        <h2 className="text-center font-semibold text-2xl md:text-[2.5rem] mb-6">
          How to use YTConverter
        </h2>
        <div className="flex flex-wrap *:flex-auto gap-2 *:max-w-fit justify-center">
          {instructionData.map((e) => {
            return (
              <Instructions
                id={e.id}
                background={e.background}
                outlineColor={e.outlineColor}
                textColor={e.textColor}
                title={e.title}
                paragraph={e.paragraph}
                number={e.id}
              />
            );
          })}
        </div>
      </section>
      <section className="max-w-[900px] mx-auto mt-16 dark:text-white px-10 lg:px-0">
        <h2 className="text-center font-semibold text-2xl md:text-[2.5rem] mb-4">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4 mt-8">
          {questionData.map((e) => {
            return (
              <Questions
                question={e.question}
                answer={e.answer}
                containsUl={e.ul}
                listText={e.ulContent}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

const Instructions = ({ background, outlineColor, textColor, title, paragraph, number }) => {
  return (
    <div className="flex gap-2 items-center justify-center rounded-[5px] bg-none dark:bg-slate-700/50 px-2 py-1">
      <div
        className={`aspect-square min-w-20 bg-opacity-15 border-opacity-100 ${background} ${textColor} outline outline-[1px] ${outlineColor} dark:outline-none text-[2.5rem] flex items-center justify-center rounded-full`}
      >
        {number}
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="dark:text-slate-400 text-slate-800 text-sm max-w-[25ch]">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

const Questions = ({ question, answer, containsUl, listText }) => {
  if (containsUl === true) {
    return (
      <div>
        <h4 className="text-lg font-semibold">{question}</h4>
        <p className="dark:text-slate-400 text-slate-800">
          A:
          <ul className="text-sm dark:text-slate-400 text-slate-800">
            {listText.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h4 className="text-lg font-semibold dark:text-white">{question}</h4>
        <p className="dark:text-slate-400 text-slate-800 text-sm">{answer}</p>
      </div>
    );
  }
};

export default MainPage;
