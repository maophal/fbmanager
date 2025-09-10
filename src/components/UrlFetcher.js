import React, { useState, useEffect } from 'react';
import moment from 'moment';

const UrlFetcher = ({ onSelectionChange, onContentLoaded }) => {
  const [urls, setUrls] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyScheduleTime, setApplyScheduleTime] = useState('');
  const getInitialScheduleTime = () => {
    return moment().add(10, 'minutes').format('YYYY-MM-DDTHH:mm');
  };
  const [scheduleBaseTime, setScheduleBaseTime] = useState(getInitialScheduleTime());

  const timeOptions = [];
  for (let h = 0; h <= 5; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 0 && m < 5) continue; // Start from 5 minutes
      const totalMinutes = h * 60 + m;
      if (totalMinutes > 5 * 60) break; // Max 5 hours

      const label = `${h}h ${m}m`;
      const value = `${h}:${m}`;
      timeOptions.push({ label, value });
    }
  }

  useEffect(() => {
    if (timeOptions.length > 0 && !applyScheduleTime) {
      setApplyScheduleTime(timeOptions[0].value);
    }
  }, [timeOptions, applyScheduleTime]);

  useEffect(() => {
    if (onContentLoaded) {
      onContentLoaded(groups.length > 0);
    }
  }, [groups, onContentLoaded]);

  const handleFetch = async () => {
    if (!urls.trim()) {
      setError('Please enter at least one URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setGroups([]);
    setSelectedGroups([]);

    const urlList = urls.split('\n').filter(url => url.trim() !== '');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = urlList.map((url, urlIndex) => ({
        id: `group-${urlIndex}`,
        url: url.trim(),
        caption: '',
        isScheduled: false,
        scheduledDateTime: '',
        items: Array.from({ length: 5 }, (_, i) => ({
          id: `item-${urlIndex}-${i}`,
          type: 'image',
          url: `${url.trim()}/${i + 1}`, // Just an example
          thumbnail: `https://picsum.photos/seed/${urlIndex}-${i}/100/100`,
        })),
      }));
      setGroups(sampleData);

    } catch (err) {
      setError('Failed to fetch content from the URLs. This might be due to CORS restrictions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGroup = (groupId) => {
    const newSelectedGroups = selectedGroups.includes(groupId)
      ? selectedGroups.filter(id => id !== groupId)
      : [...selectedGroups, groupId];
    setSelectedGroups(newSelectedGroups);
    onSelectionChange(newSelectedGroups.map(id => groups.find(group => group.id === id)));
  };

  const handleSelectAll = () => {
    const allGroupIds = groups.map(group => group.id);
    setSelectedGroups(allGroupIds);
    onSelectionChange(groups);
  };

  const handleUnselectAll = () => {
    setSelectedGroups([]);
    onSelectionChange([]);
  };

  const handleClearAll = () => {
    setGroups([]);
    setSelectedGroups([]);
    onSelectionChange([]);
  };

  const handleGroupChange = (groupId, field, value) => {
    const newGroups = groups.map(group =>
      group.id === groupId ? { ...group, [field]: value } : group
    );
    setGroups(newGroups);
    if (selectedGroups.includes(groupId)) {
        onSelectionChange(selectedGroups.map(id => newGroups.find(group => group.id === id)));
    }
  };

  const handleApplySchedule = () => {
    if (!applyScheduleTime || !scheduleBaseTime) return;
  
    const [hours, minutes] = applyScheduleTime.split(':').map(Number);
  
    const baseScheduleTime = moment(scheduleBaseTime);
    
    const newGroups = [...groups];

    const selectedGroupObjects = newGroups.filter(g => selectedGroups.includes(g.id));

    selectedGroupObjects.forEach((group, index) => {
      const scheduledTime = baseScheduleTime.clone().add(index * hours, 'hours').add(index * minutes, 'minutes');
      group.isScheduled = true;
      group.scheduledDateTime = scheduledTime.format('YYYY-MM-DDTHH:mm');
    });
  
    setGroups(newGroups);
    onSelectionChange(selectedGroupObjects);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="url-input">Enter URLs (one per line)</label>
        <textarea
          id="url-input"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          rows="3"
          value={urls}
          onChange={(e) => {
            setUrls(e.target.value);
            if (error) {
              setError(null);
            }
          }}
          placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
        />
        {error && <div className="invalid-feedback">{error}</div>}
        <button className="btn btn-primary mt-2" onClick={handleFetch} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="sr-only">Loading...</span>
            </>
          ) : (
            'Fetch'
          )}
        </button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      

      {!loading && !error && groups.length === 0 && (
        <div className="card mt-3">
          <div className="card-body text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-images mb-3" viewBox="0 0 16 16">
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2zM1 5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1z"/>
              <path d="M10.648 8.447a.5.5 0 0 1 .577-.093l2.71 2.168a.5.5 0 0 1-.758.64l-2.43-1.944a.5.5 0 0 1 .093-.577zM4.28 11.282a.5.5 0 0 1 .64.758l-2.168 2.71a.5.5 0 0 1-.64-.758l2.168-2.71z"/>
            </svg>
            <h5 className="card-title">No Content</h5>
            <p className="card-text">Enter some URLs in the box above and click "Fetch" to see the content here.</p>
          </div>
        </div>
      )}

      {!loading && groups.length > 0 && (
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-secondary mr-2" onClick={handleSelectAll}>Select All</button>
          <button className="btn btn-secondary mr-2" onClick={handleUnselectAll}>Unselect All</button>
          <button className="btn btn-danger" onClick={handleClearAll}>Clear All</button>
        </div>
      )}

      {selectedGroups.length > 0 && (
        <div className="d-flex justify-content-end mb-3">
          <input
            type="datetime-local"
            className="form-control mr-2"
            value={scheduleBaseTime}
            onChange={(e) => setScheduleBaseTime(e.target.value)}
            style={{ width: '250px' }}
          />
          <select
            className="form-control mr-2"
            value={applyScheduleTime}
            onChange={(e) => setApplyScheduleTime(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">Apply schedule to selected</option>
            {timeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button className="btn btn-secondary" onClick={handleApplySchedule} disabled={!applyScheduleTime}>
            Apply
          </button>
        </div>
      )}

      {groups.map(group => (
        <div key={group.id} className={`card mb-3 ${selectedGroups.includes(group.id) ? 'border-primary' : ''}`}>
          <div className="card-header" onClick={() => handleSelectGroup(group.id)}>
            {group.url}
            {selectedGroups.includes(group.id) && (
              <div className="float-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="bg-primary rounded-circle p-1">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              {group.items.map(item => (
                <div className="col" key={item.id}>
                  <img src={item.thumbnail} className="img-fluid" alt="Fetched content" />
                </div>
              ))}
            </div>
            <div className="form-group mt-2">
              <textarea
                className="form-control"
                placeholder="Caption"
                value={group.caption}
                onChange={(e) => handleGroupChange(group.id, 'caption', e.target.value)}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`publish-now-${group.id}`}
                checked={!group.isScheduled}
                onChange={() => handleGroupChange(group.id, 'isScheduled', false)}
              />
              <label className="form-check-label" htmlFor={`publish-now-${group.id}`}>Publish Now</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`schedule-${group.id}`}
                checked={group.isScheduled}
                onChange={() => handleGroupChange(group.id, 'isScheduled', true)}
              />
              <label className="form-check-label" htmlFor={`schedule-${group.id}`}>Schedule</label>
            </div>
            {group.isScheduled && (
              <div className="form-group mt-2">
                <input
                  type="datetime-local"
                  className="form-control"
                  value={group.scheduledDateTime}
                  onChange={(e) => handleGroupChange(group.id, 'scheduledDateTime', e.target.value)}
                />
              </div>
            )}
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default UrlFetcher;