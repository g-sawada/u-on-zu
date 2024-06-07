import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import NumberInputBasic from "../shared/NumberInputBasic";
import ErrorMessage from "../shared/error_message";
import { downloadImage } from './downloadImage';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DownloadImageButton({
  // layoutHeight,
  // layoutWidth,
  // graphTitle,
  settingValues,
  open,
  handleClose,
  cityId
  }) {



  const [errorMessage, setErrorMessage] = useState('');

  //出力ファイル設定を別で管理
  const [outputHeight, setOutputHeight] = useState(Number(settingValues.layoutHeight));
  const [outputWidth, setOutputWidth] = useState(Number(settingValues.layoutWidth));
  const [outputFileName, setOutputFileName] = useState(settingValues.title);

  //propsが更新された時，出力ファイル設定値も自動更新するようにする
  useEffect(() => {
    console.log('ここはdownload_image : ', settingValues);
    setOutputHeight(Number(settingValues.layoutHeight));
    setOutputWidth(Number(settingValues.layoutWidth));
    setOutputFileName(settingValues.title);
  },[settingValues])

  //フォームの設定。register, handleSubmit, resetはuseFormから取得できる

  //⭐useFormを使う場合は，デフォルト値にdefaultValuesを使う必要あり。さらに，ステートで更新するならsetValueを使う必要あり
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      height: outputHeight,
      width: outputWidth,
      title: outputFileName
    }
  });
  //
  useEffect(() => {
    setValue('height', outputHeight);
    setValue('width', outputWidth);
    setValue('title', outputFileName);
  }, [outputHeight, outputWidth, outputFileName, setValue]);

  //フォームの送信処理
  const onSubmit = async () => {
    try {
      const response = await createCount()
      if (response.ok) {
        const responseData = await response.json();
        console.log('送信リクエスト完了！')
        console.log('responseData : ', responseData);
        downloadImage(outputHeight, outputWidth, outputFileName)   //画像ダウンロードの実行
        handleClose();
      } else {
        const errorData = await response.json();
        setServerError('サーバーからの応答がエラーです。');
        console.error('server response (error): ', errorData.error);
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。');
    }
  }

  // onSubmitで呼ばれるバックへの送信処理
  const createCount = async () => {
    const response = await fetch('/api/download_counts', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        download_image: {
          city_id: cityId,
        },
      }),
    })
    return response;
  }

  return (
    <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="" sx={style}>
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold">画像ファイル出力</h2>
                <div style={{marginTop: '15px'}}>
                  <ErrorMessage message={errors.title?.message || ''} />
                  <ErrorMessage message={errors.height?.message || ''} />
                  <ErrorMessage message={errors.width?.message || ''} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '100px 100px', gap: '10px', marginTop: '40px' }}>
                  {/* <label htmlFor="test">test</label>
                  <div style={{width: '200px'}}>
                    <NumberInputBasic />
                  </div> */}
                  <label htmlFor="outputHeight">縦幅</label>
                  <input 
                    {...register('height', {
                      required: '縦幅を入力して下さい。',
                      min: {value: 250, message: '縦幅は250以上の値を入力して下さい。'},
                      max: {value: 3000, message: '縦幅は3000以下の値を入力して下さい。'}})}  
                    style={{ border: '1px solid #000' }}
                    id="outputHeight"
                    type='number'
                    min={250}
                    max={3000}
                    step={10}
                    onChange={(e) => setOutputHeight(e.target.value)}
                    />
                  <label htmlFor="outputWidth">横幅</label>
                  <input 
                    {...register('width', {
                      required: '横幅を入力して下さい。',
                      min: {value: 250, message: '横幅は250以上の値を入力して下さい。'},
                      max: {value: 3000, message: '横幅は3000以下の値を入力して下さい。'}})}  
                    style={{ border: '1px solid #000' }}
                    id="outputWidth"
                    type='number'
                    min={250}
                    max={3000}
                    step={10}
                    onChange={(e) => setOutputWidth(e.target.value)}
                    />
                  <label htmlFor="outputFileName">ファイル名</label>
                  <input 
                    {...register('title', {
                      maxLength: {value: 255, message: 'タイトルは255文字以内で入力して下さい。'}})} 
                    style={{ border: '1px solid #000', width: '200px'}}
                    id="outputFileName"
                    type='text'
                    onChange={(e) => setOutputFileName(e.target.value)}
                    />
                </div>

                <div style={{marginTop: '40px'}}>
                  <button style={{width: '100%'}} type="submit" className='btn btn-primary'>
                    画像ダウンロード
                  </button>
                </div>
              </form>
            </div>
            <div style={{marginBottom: '20px'}}></div>
            {/* <NumberInputBasic /> */}
          </Box>
        </Modal>
    </>
  )
}
