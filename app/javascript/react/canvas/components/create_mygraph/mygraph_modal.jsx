import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

export default function MyGraphModal({ graphSetting, cityId, open, handleClose }) {

  const {       //フォームの設定。register, handleSubmit, resetはuseFormから取得できる
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState(''); //サーバーエラーのステート

  //⭐ フォームの送信処理
  const onSubmit = async (data) => {
    try {
      const response = await createGraph(  //バックへPOSTリクエスト, 後ろで定義
        data.title,
        data.note,
      )
      if (response.ok) {
        const responseData = await response.json();
        console.log('送信リクエスト完了！')
        console.log('responseData : ', responseData);
        reset();       //フォームのリセット
        handleClose();  //モーダルを閉じる
      } else {
        // setServerError('サーバーエラーが発生しました。');
        console.log('サーバーエラーが発生しました。');
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。');
    }
  }

  // onSubmitで呼ばれるバックへの送信処理
  const createGraph = async (title, note) => {
    const response = await fetch('/api/graphs', {  //エンドポイントは/api/graphsのPOST → api/graphsコントローラーのcreateアクションを参照
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        graph: {
          title,
          note,
          graph_setting: graphSetting,
          city_id: cityId,
        },
      }),
    })
    return response;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="" sx={style}>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h2 className="text-2xl font-bold" style={{marginBottom: '40px'}}>マイグラフ保存</h2>
            {/* エラーメッセージ表示部分 */}
            {/* <ErrorMessage message={serverError} />
            <ErrorMessage message={errors.title?.message || ''} /> */}
            
            {/* Title */}
            <label htmlFor="title" className="mb-2 text-lg">
              タイトル
            </label>
            <input
              {...register('title', { required: 'Titleを入力して下さい。' })}
              className="input input-bordered mb-5"
            />

            {/* Note */}
            <label htmlFor="note" className="mb-2 text-lg">
              メモ
            </label>
            <textarea
              {...register('note')}
              className="textarea textarea-bordered mb-5"
            />
            <button type="submit" className="btn mt-2">
              マイグラフ保存
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  )
}